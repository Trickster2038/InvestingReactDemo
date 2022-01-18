import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

class ApiList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/search/a")
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
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'symbol', headerName: 'Symbol', width: 130 }]
            return (
                // <ul>
                //     {items.map(item => (
                //         <li key={item.id_}>
                //             {item.name} {item.symbol}
                //             <Button variant="contained">Contained</Button>
                //             {item.id = item.id_}
                //             {item.id}
                //         </li>
                //     ))}
                // </ul>
                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={items}
                        columns={columns}
                    />
                </div>
            );
        }
    }
}

export default ApiList;