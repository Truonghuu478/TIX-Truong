import React from "react";
// const urlPublic = process.env.PUBLIC_URL;

function ThemeSnow() {
    const [isSnow, setSnow] = React.useState(false);
    React.useEffect(() => {
        let s = setTimeout(() => {
            setSnow(true);
        }, 10000);

        return () => {
            clearTimeout(s);
        };
    }, []);
    const renderSnows = React.useCallback(() => {
        return [...Array(21)].map((snow, index) => {
            return (
                <img
                    style={{ animationName: index % 2 !== 0 ? "bounce" : "bounce2", animationDelay: "4s" }}
                    className={`ball${index}`}

                    key={index}
                    src={"https://tix.vn/app/assets/img/noel/2018/snowflake_1.png"}
                    alt="snow"
                />
            );
        });
    }, []);

    const renderSnows1 = React.useCallback(() => {
        return [...Array(21)].map((snow, index) => {
            return (
                <img
                    style={{ animationName: index % 2 !== 0 ? "bounce" : "bounce2" }}
                    className={`balls${index}`}
                    key={index}
                    alt="snow2"

                    src={"https://tix.vn/app/assets/img/noel/2018/snowflake_1.png"}
                />
            );
        });
    }, []);

    const renderSnows2 = React.useCallback(() => {
        return [...Array(21)].map((snow, index) => {
            return (
                <img
                    style={{ animationName: index % 2 !== 0 ? "bounce" : "bounce2" }}
                    className={`ball${index}`}
                    key={index}
                    alt="snow"

                    src={"https://tix.vn/app/assets/img/noel/2018/snowflake_1.png"}
                />
            );
        });
    }, []);
    return (
        <div p={0} className="snows">
            {renderSnows()}
            {isSnow && renderSnows1()}
            {isSnow && renderSnows2()}
        </div>
    );
}

export default ThemeSnow;
