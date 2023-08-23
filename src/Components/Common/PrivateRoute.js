import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PrivateRoute(props) {
    const nav = useNavigate()
    useEffect(() => {
        let Email = localStorage.getItem("Email")
        if (!Email) {
            nav("/login")
        }
    }, [])
    return (
        <div>
            {props.children}
        </div>
    )
}
