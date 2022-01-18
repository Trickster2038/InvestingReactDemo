import React from 'react';
import TextField from '@mui/material/TextField';
import ApiList from './ApiList';

class SearchBar extends React.Component {

    state = { search: 'a' }

    render() {
        return (
            <div>
                {console.log('render search ' + this.state.search)}
                <TextField style={{ margin: 16, width: '70%' }}
                    id="outlined-basic" label="Stock name" variant="outlined" onChange={this.handleChange} />
                <ApiList asset_name={this.getSearchState.bind(this)} />
            </div>
        );
    }

    getSearchState = ( ) => {
        return this.state.search
    }

    handleChange = (e) => {
        this.setState({ search: e.target.value })
        console.log(this.state.search)
    }
}

export default SearchBar;