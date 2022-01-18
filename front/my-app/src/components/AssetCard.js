import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSearchParams } from "react-router-dom";

class AssetCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: []
        };
    }

    call_api_info() {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const symbol = urlParams.get('symbol')
        const country = urlParams.get('country')

        const url = "http://localhost:5000/info/" + symbol + "?country=" + country
        { console.log(url) }
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        item: result
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
        this.call_api_info()
    }

    goBack() {
        window.location.replace('/');
    }

    render() {
        const { error, isLoaded, item } = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Загрузка...</div>;
        } else {
            return (
                <div style={{ margin: 'auto', height: 700, width: '70%', padding: 16 }}>
                    <Card sx={{ maxWidth: '100%', margin: 'auto' }} variant="outlined">
                        {/* <CardMedia
                            component="img"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <div style={{ textAlign: 'left' }}>
                                <Typography variant="body1" color="text.secondary">
                                    Symbol: &nbsp; {item.symbol} <br/>
                                    Country: &nbsp; {item.country[0].toUpperCase() + item.country.substring(1)} <br/>
                                    Exchange: &nbsp; {item.exchange} <br/>
                                    Type: &nbsp; {item.pair_type} <br/>
                                </Typography>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={this.goBack}>Back</Button>
                        </CardActions>
                    </Card>
                </div>
            );
        }
    }
}

export default AssetCard;