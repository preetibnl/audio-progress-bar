import React from 'react'

const Index = ({ percent, colorName }) => {
    return (
        <>
            <div className={`progress-bar ${colorName}
                progress-bar-stripped`} style={{
                    width: percent,
                    marginRight: "5px",
                    borderRadius: "50px",
                    opacity: "0.5",
                    position: "absolute",
                    height: "16px",
                    left: percent

                }}>
            </div>
        </>
    )
}

export default Index;