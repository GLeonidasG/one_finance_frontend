import React from "react"
import "./index.css"

type Card = {
  cardID?: string,
  owner?: string,
  validFrom?: string | Date,
  validThru?: string | Date,
  title?: string
}

const dateContainer: React.CSSProperties = {display: "flex", flexDirection: "row", alignItems: "center", marginInline: "0.5rem"};
export function Card({ cardID, title, owner, validFrom, validThru }: Card) {

  return (
    <div className="container rounded-container card">
      <h3>{title}</h3>
      <div className="container card-info">
        <div style={{ ...dateContainer }}>
          <h6>valid <br /> from</h6>
          <h5>{String(validFrom)}</h5>
        </div>
        <div style={{ ...dateContainer }}>
          <h6>valid <br /> thru</h6>
          <h5>{String(validThru)}</h5>
        </div>
      </div>
      <h3>{owner}</h3>
      <h2>{cardID}</h2>
    </div>
  )

}

const cards = [
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" },
  { cardID: "9999 9999 9999 9999", owner: "GENARIO L GOETZ", validFrom: "31/10/1999", validThru: "31/10/2050", title: "NUBANK" }
];

export default function Dashboard() {
  return (
    <div className="container dashboard-container">
      <div className="container rounded-container darkblur-shadow cards-container column">
        {cards.map((card) => <Card {...card} />)}
      </div>
      <div className="container rounded-container darkblur-shadow table-container">
      <h1>TABLE</h1>
      </div>
    </div>
  );
}
