
import classNames from 'classnames';
import { Faction } from '../galaxy/Types';
import raceData from "../assets/data/raceData.json"

import './DisplayRace.scss';

type DisplayRaceProps = {
    faction: Faction
    status: 'SELECTED' | 'BANNED' | 'NORMAL' | 'BACK'
}

function DisplayRace({ faction, status }: DisplayRaceProps) {
    const id = raceData.raceToHomeSystemMap[faction]
    const image = `tiles/ST_${id}.webp`
    const alt = `${faction} home system`

    const showSelect = ['BANNED', 'NORMAL'].includes(status)
    const showBan = ['SELECTED', 'NORMAL'].includes(status)

    return(
        <div className={classNames('col-5', 'col-md-3')}>
            <img src={image} 
                alt={alt}
                height="200" 
                className={classNames({ 'displayRaceBanned':  status === "BANNED" })}
            />
            <div style={{ width: "100%"}} className={classNames('row', 'justify-content-evenly')}>
                {showSelect && <button type="button" className={classNames('btn', 'col-4', 'btn-primary')}>Select</button> }
                {showBan && <button type="button" className={classNames('btn', 'col-4', 'btn-secondary')}>Ban</button> }
            </div>
        </div>
    )
}

export { DisplayRace }