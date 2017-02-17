import React from 'react';

class Video extends React.Component {
    render() {
        return (
            <div className="block">
                <div className="video block__inner">
                    <h3>Youtube channel</h3>
                    <iframe width="100%" height="320" allowFullScreen="allowFullScreen"
                        src="https://www.youtube.com/embed/?playlist=E1SKhP7IQvM,I8bXRJYvVAU,VydA83r4rj4,1N5wemlFqxE,tT9dtmWvgmE,grVUVpCTOtc,d8ALL7F8fkU,z06YSx-2miY,38yrvyoheVk,6lG-d4-y8Ng,aCOND_4qdt8,yUOMJxmZSnk,wkQAZtTOQNg,qmIhqC6eu_8&loop=1"></iframe>
                </div>
            </div>
        );
    }
}

export default Video;
