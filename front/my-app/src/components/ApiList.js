import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { browserHistory } from 'react-router';

class ApiList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    call_api() { 
        { console.log('api call ' + this.props.asset_name()) }
        fetch("http://localhost:5000/search/" + this.props.asset_name())
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.stocks
                    });
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.call_api()
    }

    componentDidUpdate(prevProps) {
        if (this.props.asset_name !== prevProps.asset_name) {
            this.call_api()
        }
    }

    cellClickHandler(params) {
        const name = params.row.name
        const url = '/stats/' + params.row.symbol + '/' +  params.row.exchange
        console.log(url)
        window.location.replace(url);
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            {
                items.map(item => (
                    item.id = item.id_
                ))
            }
            const columns = [
                { field: 'name', headerName: 'Name', width: 300 },
                { field: 'symbol', headerName: 'Symbol', width: 100 },
                { field: 'exchange', headerName: 'Exchange', width: 100 },
                { field: 'pair_type', headerName: 'Type', width: 100 },
                { field: 'country', headerName: 'Country', width: 200 }
            ]
            // this.call_api()
            return (
                <div style={{ margin: 'auto', height: 700, width: '70%' }}>
                    {console.log('render grid ' + this.props.asset_name())}
                    <DataGrid
                        rows={items}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        onCellClick={this.cellClickHandler}
                    />
                </div>
            );
        }
    }
}

export default ApiList;