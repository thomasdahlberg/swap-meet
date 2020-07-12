import React, { Component } from 'react';
import swapSiteService from '../../utils/swapSiteService';
import userService from '../../utils/userService';

class ItemToSiteForm extends Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState();
    }
    
    containerStyle = {
        marginTop: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F2F5DE',
        border: 'black solid 1px',
        borderRadius: '10px',
        padding: '1rem'
    };
    
    buttonStyle = {
        backgroundColor: '#86e7b8',
        fontWeight: '900',
        padding: '1rem',
        boxShadow: '1px 1px 5px 1px gray',
        borderRadius: '10px',
        border: 'none',
        fontSize: '1rem',
        fontFamily: 'Open Sans , serif',
        };

    selectStyle ={
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
    }

    getInitialState() {
        return {
            user: userService.getUser(),
            items: this.props.items,
            item: null,
            site: this.props.siteId       
        };
    }

    isFormValid = () => {
        return (
            this.state.name && 
            this.state.user &&
            this.state.site
        );
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log('linking new item to site');
        try {
            const { user, item, site } = this.state;
            await swapSiteService.linkItem({ user, item, site });
            this.props.handleGetSites();
            console.log('sites gotten');
            // this.props.history.push('/swapsites');
        } catch (error) {
            console.log(error);
        }
    }



    render() {
        return(
            <form style={this.containerStyle} onSubmit={this.handleSubmit}>
                    <div style={this.selectStyle}>
                        <label htmlFor="itemType">Select Item:</label>
                        <select 
                            id="item" 
                            name="item"  
                            onChange={this.handleChange}
                        >
                        {this.state.items ?
                            this.state.items.map(({ name, _id}) => (
                            <option key={_id} name="item" value={_id}>{name}</option>
                            )) : 
                            <option>no items</option>
                        }
                        </select>
                    </div>
                    <button style={this.buttonStyle} type="submit">List Your Item Here</button>
            </form>
        );
    }
}

export default ItemToSiteForm;
