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
        {field: 'name', headerName: 'Название', flex: 3},
        {field: 'form.name', headerName: 'Название шаблона', flex: 3},
        {field: 'shop_address', headerName: 'Адрес магазина', flex: 3},
        {field: 'expire_date', headerName: 'Дата окончания', flex: 2},
        {field: 'active', headerName: 'Активность', flex: 1},

    ]

    return (
        <Box sx={{width: "100%", height: "80%", display: "flex"}}>
            <DataGrid columns={columns} rows={revisions}/>
        </Box>
    )
}

export default Revisions;