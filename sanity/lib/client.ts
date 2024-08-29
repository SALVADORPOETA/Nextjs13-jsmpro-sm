import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const readClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token,
})
