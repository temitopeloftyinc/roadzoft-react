import React from 'react';
import * as Icon from 'react-feather';
import * as Item from '@mui/material';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../../utils/Api';
import NewMessage from '../modals/NewMessage';

export default function MessageHeader({title, user, handleClick, newTitle, newBody}) {
  

   
    return (
        <div className="header-container flex flex-row justify-between items-center mx-5 my-2">
            <div className="flex flex-row justify-center items-center">
                <h2 className="font-semibold mr-2 text-2xl">{title}</h2>
                
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="mr-8 flex flex-row justify-between items-center">
                <Icon.Search className="p-1 mr-5" /> <Icon.Bell className="p-1" />
                </div>
                <span className="text-3xl text-gray-200 mr-5">|</span>
                <div>
                    <div className="flex flex-row justify-evenly items-center">
                        <span className="mr-2">{user.name}</span>
                        <Item.Avatar variant="circular" />
                    </div>
                    <p className="text-left mr-7">{user.phone}</p>
                </div>
            </div>
        </div>
    )
}
