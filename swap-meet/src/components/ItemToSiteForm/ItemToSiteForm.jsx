import React, { Component } from 'react';
import swapSiteService from '../../utils/swapSiteService';
import userService from '../../utils/userService';

class ItemToSiteForm extends Component {
    constructor(props) {
        super(props)

   
    
    this.state = this.getInitialState();
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
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <label htmlFor="itemType">Select Item</label>
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
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        );
    }
}

export default ItemToSiteForm;
