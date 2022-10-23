import {DataGrid} from "@mui/x-data-grid";
import {useLayoutEffect, useState} from "react";
import {getRevisions} from "../../../../networking/revisions";
import {Box} from "@mui/material";

type Revision = {
    form: Form,
    shop_address: string,
    name: string,
    expire_date: string,
    active: boolean,
}

type Form = {
    name: string,
    revision_id: string,
    is_template: boolean,
}

const Revisions = () => {
    const [revisions, setRevisions] = useState<Revision[]>([]);

    const updateRevisions = () => {
        getRevisions().then((res) => {
            setRevisions(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    useLayoutEffect(() => {
        updateRevisions()
    }, []);

    const columns = [
        {field: 'name', headerName: 'Название'},
        {field: 'form.name', headerName: 'Название шаблона'},
        {field: 'shop_address', headerName: 'Адрес магазина'},
        {field: 'expire_date', headerName: 'Дата окончания'},
        {field: 'active', headerName: 'Активность'},

    ]

    return (
        <Box sx={{width: "100%", height: "100%"}}>
            <DataGrid columns={columns} rows={revisions}/>
        </Box>
    )
}

export default Revisions;