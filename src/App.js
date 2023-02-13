import React, { useState, useEffect } from 'react';
import './style.css';
import { lead, contact, date, text, lookup } from './data.js';

export default function App() {
  const [leadType, setLeadType] = useState('');

  const [leads, setLead] = useState({ lead: [], contact: [] });
  const [dataTypes, setDataTypes] = useState([]);

  const [filter, setFilter] = useState([]);

  const [f, setF] = useState({ lead: [], contact: [] });

  useEffect(() => {
    setLeadType('lead');
    setLead({ lead: lead, contact: contact });
  }, []);

  useEffect(() => {
    const leadDataType = [...new Set(leads.lead?.map((f) => f.type))];
    const contactDataType = [...new Set(leads.contact?.map((f) => f.type))];
    setDataTypes([...new Set([...leadDataType, ...contactDataType])]);
  }, [leads]);

  const getOperator = (dataTypes) => {
    console.log(dataTypes);
    switch (dataTypes) {
      case 'date':
      case 'datetime':
      case 'currency':
      case 'number':
        return date;

      case 'text':
      case 'picklist':
        return text;

      case 'lookup':
        return lookup;
    }
  };

  return (
    <div className="g-parent">
      <div className="parent">
        <div>
          <lable>
            {' '}
            <input
              type="radio"
              name="lead_type"
              value={'lead'}
              checked={leadType === 'lead'}
              onChange={(e) => setLeadType(e.target.value)}
            />{' '}
            Lead
          </lable>
          <lable>
            {' '}
            <input
              type="radio"
              name="lead_type"
              value={'contact'}
              checked={leadType === 'contact'}
              onChange={(e) => setLeadType(e.target.value)}
            />{' '}
            Contact
          </lable>
        </div>
        <div>
          <select
            name="field"
            onChange={(e) => {
              return setF((prev) => ({
                ...prev,
                [leadType]: [
                  ...prev[leadType],
                  {
                    id: '',
                    zoho_field: e.target.value,
                    value: '',
                  },
                ].map((f, i) =>
                  leads[leadType].some((g) => g.name === f.zoho_field)
                    ? {
                        ...f,
                        id: i,
                        zoho_field: leads[leadType].find(
                          (g) => g.name === f.zoho_field
                        ).label,
                        dataTypes: leads[leadType].find(
                          (g) => g.name === f.zoho_field
                        ).type,
                      }
                    : f
                ),
              }));
            }}
          >
            {leads[leadType]?.map((e) => (
              <option value={e.name}>{e.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card_wrapper">
        {f[leadType]?.map((zf) => {
          return (
            <div className="field_card">
              <p>{zf.zoho_field}</p>

              <div>
                <select>
                  {Object.values(getOperator(zf.dataTypes)).map((f) => (
                    <option>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// {
//   id: '',
//   zoho_field: e.target.value,
//   value: '',
// },
