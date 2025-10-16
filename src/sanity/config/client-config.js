import { projectId, dataset, apiVersion } from '../env'

const config = {
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Live API higher costs.. 
    withDraft: true
}



export default config;