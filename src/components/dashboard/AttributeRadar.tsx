import { useState } from 'react'
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from 'recharts'
import type { Attribute } from '../../models/life-rpg'
import { useLanguage } from '../../hooks/useLanguage'
import { useLifeRPG } from '../../hooks/life-rpg-context'

function AttributeEditor({ attributes, onClose }: { attributes: Attribute[]; onClose: () => void }) {
  const { setState } = useLifeRPG()
  const { t, localize } = useLanguage()
  const [draft, setDraft] = useState(attributes)
  const save = () => { setState((current) => ({ ...current, attributes: draft })); onClose() }
  return (
    <div className="attribute-editor" role="dialog" aria-modal="true" aria-label={t('editAttributes')}>
      <div className="editor-head"><strong>{t('editAttributes')}</strong><small>{t('attributesNote')}</small></div>
      <div className="attribute-inputs">
        {draft.map((attribute, index) => (
          <label key={attribute.id}><span>{localize(attribute.name)}</span><output>{attribute.value}</output>
            <input type="range" min="1" max="10" step="0.5" value={attribute.value} onChange={(event) => setDraft((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, value: Number(event.target.value) } : item))} />
          </label>
        ))}
      </div>
      <div className="editor-actions"><button className="text-button" onClick={onClose}>{t('cancel')}</button><button className="primary-button" onClick={save}>{t('save')}</button></div>
    </div>
  )
}

export function AttributeRadar() {
  const { state } = useLifeRPG()
  const { t, localize } = useLanguage()
  const [editing, setEditing] = useState(false)
  const data = state.attributes.map((attribute) => ({ label: localize(attribute.name), value: attribute.value }))
  return (
    <section className="panel attributes-panel">
      <div className="section-heading"><div><h2>{t('lifeAttributes')}</h2><span>{t('currentBuild')}</span></div><button className="text-button" onClick={() => setEditing(true)}>{t('editAttributes')} →</button></div>
      <p className="section-note">{t('attributesNote')}</p>
      <div className="radar-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="67%"><PolarGrid stroke="#d9d2c7" /><PolarAngleAxis dataKey="label" tick={{ fill: '#5f5a53', fontSize: 11 }} /><PolarRadiusAxis angle={90} domain={[0, 10]} tick={false} axisLine={false} /><Radar dataKey="value" stroke="#2d5a6b" fill="#668796" fillOpacity={0.48} isAnimationActive={false} /></RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="attribute-values">{state.attributes.map((attribute) => <span key={attribute.id}><small>{localize(attribute.name)}</small><b>{attribute.value}</b></span>)}</div>
      {editing && <AttributeEditor attributes={state.attributes} onClose={() => setEditing(false)} />}
    </section>
  )
}
