import React, { useState } from 'react';
import "./QuestionInfo.css";

const QuestionInfoText = ({ questionInfo }) => {
    let questionInfo1 = questionInfo;

    return (
        <div className="questionInfo">
            <i>{questionInfo}</i>
        </div>
    )
}

export default QuestionInfoText;

