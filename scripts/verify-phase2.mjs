const targets = await fetch('http://127.0.0.1:9444/json').then((response) => response.json())
const page = targets.find((target) => target.type === 'page' && target.url.startsWith('http://127.0.0.1:5180'))
if (!page) throw new Error('No browser page target found')

const socket = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }) })
let requestId = 0
const pending = new Map()
socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (!message.id || !pending.has(message.id)) return
  const { resolve, reject } = pending.get(message.id)
  pending.delete(message.id)
  if (message.error) reject(new Error(message.error.message)); else resolve(message.result)
})
const call = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++requestId; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params }))
})
const evaluate = async (expression) => {
  const result = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
  return result.result.value
}
const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

await call('Page.enable')
await call('Runtime.enable')
await wait(1000)
const initial = await evaluate(`({ title: document.querySelector('.hero-name-row h1')?.textContent, radar: Boolean(document.querySelector('.recharts-radar-polygon')), language: document.documentElement.lang })`)
await evaluate(`[...document.querySelectorAll('button')].find((button) => button.textContent.trim() === 'EN')?.click()`)
await wait(300)
const english = await evaluate(`({ language: document.documentElement.lang, heading: document.querySelector('.attributes-panel h2')?.textContent })`)
await evaluate(`(async () => {
  [...document.querySelectorAll('button')].find((button) => button.textContent.includes('Edit Attributes'))?.click();
  await new Promise((resolve) => setTimeout(resolve, 100));
  const input = document.querySelector('.attribute-inputs input');
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  setter.call(input, '9'); input.dispatchEvent(new Event('input', { bubbles: true }));
  await new Promise((resolve) => setTimeout(resolve, 100));
  [...document.querySelectorAll('button')].find((button) => button.textContent.trim() === 'Save')?.click();
})()`)
await wait(400)
const saved = await evaluate(`JSON.parse(localStorage.getItem('life-rpg:state'))`)
await call('Page.reload', { ignoreCache: true })
await wait(1200)
const reloaded = await evaluate(`({ language: document.documentElement.lang, value: JSON.parse(localStorage.getItem('life-rpg:state')).attributes[0].value, heading: document.querySelector('.attributes-panel h2')?.textContent })`)
console.log(JSON.stringify({ initial, english, saved: { language: saved.language, value: saved.attributes[0].value }, reloaded }, null, 2))
socket.close()
