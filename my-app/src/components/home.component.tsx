import React from "react";

interface IProps {};

interface IState {};

class Home extends React.Component<IProps, IState>{

    public componentDidMount() {

    }

    public render(): React.ReactNode {
        return(
            <div>
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold">
                        React use TypeScript CRUD simple app
                    </h1>
                </div>
            </div>
        )
    }
}

export default Home;