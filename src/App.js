import React, { useState } from 'react';

const App = () => {

    const [passConfig, setPassConfig] = useState({
        passLength: 16,
        characterSet: {
            upCase: true,
            lowCase: true,
            number: true,
            symbol: true
        },
        security: {
            level: 'very strong',
            badgeColor: 'green'
        }
    });

    let customTemplate = `${passConfig.characterSet.upCase?'ABCDEFGHIJKLMNOPQRSTUVWXYZ':''}${passConfig.characterSet.lowCase?'abcdefghijklmnopqrstuvwxyz':''}${passConfig.characterSet.number?'1234567890':''}${passConfig.characterSet.symbol?`!"#$%&'()*+,-./:;<\`=>?@[]{}|^_`:''}`

    const generatePass = (tempStr, n) => {
        let result = '';
        for (let i=0; i < n; i++) {
            result += tempStr.charAt(Math.floor(Math.random() * 
            tempStr.length))
        }
        return result;
    }

    let strongPass = generatePass(customTemplate, passConfig.passLength)

    const validatePassword = (passStr) => {
        const checkedboxLeft = checkedCount()
        let result = {
            level: '',
            badgeColor: ''
        };
        switch (true) {
            case checkedboxLeft === 0:
                result.level = 'invalid';
                result.badgeColor = 'red';
                break;
            case passStr.passLength < 8:
                result.level = 'weak';
                result.badgeColor = 'red';
                break;
            case passStr.passLength < 10:
                result.level = 'still weak';
                result.badgeColor = 'tomato';
                break;
            case passStr.passLength < 17:
                result.level = 'strong';
                result.badgeColor = 'limegreen';
                break;
            case passStr.passLength > 30:
                result.level = 'OMG, STAHP!';
                result.badgeColor = 'navy';
                break;
            default:
                result.level = 'very strong';
                result.badgeColor = 'blue';
        }
        return result;
    }

    const handleRegenerate = () => {
        const tempPassConfig = {...passConfig}
        setPassConfig(tempPassConfig)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(strongPass)
    }

    const handleLengthRangeChange = (e) => {
        const tempPassConfig = {...passConfig}
        tempPassConfig.passLength = e.target.value;
        tempPassConfig.security = validatePassword(tempPassConfig);
        setPassConfig(tempPassConfig);
    }

    const handleLengthMinus = e => {
        const tempPassConfig = {...passConfig};
        if (tempPassConfig.passLength > 4) {
            tempPassConfig.passLength--
        } else return null
        tempPassConfig.security = validatePassword(tempPassConfig);
        setPassConfig(tempPassConfig);
    }

    const handleLengthAdd = e => {
        const tempPassConfig = {...passConfig};
        if (tempPassConfig.passLength < 50) {
            tempPassConfig.passLength++
        } else return null
        tempPassConfig.security = validatePassword(tempPassConfig);
        setPassConfig(tempPassConfig);
    }

    const checkedCount = () => {
        let checkCount = 0
        const checkboxSet = {...passConfig.characterSet}
        for (let i in checkboxSet) {
            if (checkboxSet[i] === true) {
                checkCount++
            }
        }
        return checkCount
    }

    const handleCheckboxChange = e => {
        const tempPassConfig = {...passConfig}
        const checkedboxLeft = checkedCount()
        if (checkedboxLeft === 1 && tempPassConfig.characterSet[e.target.value] === true) {
            alert("You need to include at least 1 element")
        } 
        tempPassConfig.characterSet[e.target.value] = !tempPassConfig.characterSet[e.target.value]
        tempPassConfig.security = validatePassword(tempPassConfig);
        setPassConfig(tempPassConfig)
    }

    return (
        <>
            <header>Strong Password Generator</header>
            <div className="content-container">
                <h3>Generate secure, random passwords to stay safe online.</h3>
                <div className="pass-section">
                    <div className="password-box">
                        <span id='password-text'>{strongPass}</span>
                        <p className="security-badge" style={{backgroundColor: passConfig.security.badgeColor}}>{passConfig.security.level}</p>
                        <button className="generate-icon" onClick={handleRegenerate}></button>
                    </div>
                    <button className="copy-btn" tooltip="Copied" tooltip-position="bottom" onClick={handleCopy}>COPY</button>
                </div>
                <div className="length-section">
                    <div className='length-text'>
                        <span className='section-title'>Password Length:</span>
                        <p name="length" id="length-output">{passConfig.passLength}</p>
                    </div>
                    <div className="length-control">
                        <div className="round-btn" onClick={handleLengthMinus}>
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzA3MUQyQiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTguNTU1OSAxMi4wMjE1SDUuOTE4NDYiIHN0cm9rZT0iIzA3MUQyQiIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="minus"/>
                        </div>
                            <input 
                                onChange={e => handleLengthRangeChange(e)} 
                                type="range" 
                                id="length" 
                                name="length" 
                                min="4" 
                                max="50" 
                                step="1" 
                                value={passConfig.passLength}>
                            </input>
                        <div className="round-btn" onClick={handleLengthAdd}>
                            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzA3MUQyQiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMjAuMTgyOSAxMS45OTg2SDEyLjAwNzlNMTIuMDA3OSAxMS45OTg2VjIwLjE3MzVNMTIuMDA3OSAxMS45OTg2SDMuODcwNDhNMTIuMDA3OSAxMS45OTg2VjMuODYxMDgiIHN0cm9rZT0iIzA3MUQyQiIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt="add"/>
                        </div>
                    </div>
                </div>
                <div className="character-section">
                    <div className='character-text'>
                        <span className='section-title'>Characters used:</span>
                    </div>
                    <div className="character-select">
                        <label className="character-box">ABC
                        <input type="checkbox" value="upCase" defaultChecked={passConfig.characterSet.upCase} onChange={e => handleCheckboxChange(e)}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="character-box">abc
                        <input type="checkbox" value="lowCase" defaultChecked={passConfig.characterSet.lowCase} onChange={e => handleCheckboxChange(e)}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="character-box">123
                        <input type="checkbox" value="number" defaultChecked={passConfig.characterSet.number} onChange={e => handleCheckboxChange(e)}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="character-box">@#$
                        <input type="checkbox" value="symbol" defaultChecked={passConfig.characterSet.symbol} onChange={e => handleCheckboxChange(e)}/>
                        <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                {/* <div className="pass-phrase">
                    <form>
                        <input type="radio" id="html" name="fav_language" value="HTML"/>
                        <label for="html">HTML</label>
                        <input type="radio" id="css" name="fav_language" value="CSS"/>
                        <label for="css">CSS</label>
                    </form>
                </div>
                <div className="check-strength">
                    <label name="your-password">Enter your password:</label>
                    <input type="text" name="your-password"></input>
                    <button>Click me to check password</button>
                    <p>Length</p>
                    <p>Strength:Very StrongMore often than not, this level of security is overkill.</p>
                    <p>Entropy:274.7 bits</p>
                    <p>Charset Size:48 characters</p>
                    <p>Estimated time to crack:</p>
                </div> */}
            </div>
        </>
    )
}

export default App;
