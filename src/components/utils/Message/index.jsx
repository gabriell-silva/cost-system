import { useEffect, useState } from 'react'
import Styles from './message.module.css'

const Message = ({ type, msg }) => {
    
    const [ visible, setVisible ] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])
    
    return (
        <>
            {visible && (
                <div className={`${Styles.Message} ${Styles[type]}`}>
                    {msg}
                </div>
            )}
        </>
    )
}

export default Message