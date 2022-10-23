import {apiInstance} from "./base";

export const createRevision = (form_template_id: string, shop_address: string, expire_date: string) => {
    return apiInstance.post('/revisions', {
        form_template_id,
        shop_address,
        expire_date
    })
}

export const getRevisions = () => {
    return apiInstance.get('/revision/avaliable')
}