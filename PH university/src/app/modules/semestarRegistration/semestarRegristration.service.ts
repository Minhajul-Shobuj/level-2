import { TSemestarRegristration } from './semestarRegistration.interface'
import { SemestarRegistration } from './semestarRegristration.model'

const createSemestarRegristrationInToDb = async (
  payload: TSemestarRegristration,
) => {
  const result = await SemestarRegistration.create(payload)
  return result
}

const updateRegisteredSemetarInDb = async (
  id: string,
  payload: Partial<TSemestarRegristration>,
) => {
  const result = await SemestarRegistration.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const SemestarRegistrationService = {
  createSemestarRegristrationInToDb,
  updateRegisteredSemetarInDb,
}
