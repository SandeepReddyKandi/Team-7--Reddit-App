/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React from "react";
import "./Logo.css"

export default function Logo() {
    return (
        <div className="logo hoverable">
            <img src="./assets/reddit_logo.png" alt="logo"/>
            <span>
                reddit
            </span>
        </div>
    );
}