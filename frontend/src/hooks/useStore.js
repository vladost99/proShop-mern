import { Context } from 'index'
import { useContext } from 'react'

export default function() {
    const {store} = useContext(Context);
    return store;
}