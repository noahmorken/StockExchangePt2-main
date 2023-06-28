import React, { useState } from 'react'
import './Dropdown.css'

function Dropdown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = ['Choose One', 'Public', 'Private'];
    return (
        <>
        <div className="dropdown-title">Visibility</div>
        <div className="dropdown">
            <div className="dropdown-btn" onClick= {(e) =>
            setIsActive(!isActive)}>
                {selected || options[0]}
                <span className="fas fa-caret-down"></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {options.map(option => (
                        <div
                            onClick={e => {
                                setSelected(option);
                                setIsActive(false);
                            }}
                            className="dropdown-item"
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}

export default Dropdown