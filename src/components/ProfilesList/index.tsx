import { useEffect, useState } from 'react'

import instance from '../../axios'
import { ProfileType } from '../../types'

import styles from './ProfileList.module.scss'

type ProfileListProps = {
  setProfileId: (id: string) => void
}

export const ProfileList: React.FC<ProfileListProps> = ({ setProfileId }) => {
  const [profiles, setProfiles] = useState<ProfileType[]>([])
  const [name, setName] = useState<string>('')
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  const fetchProfiles = async () => {
    const { data } = await instance.get('/profiles')
    setProfiles(data)
  }

  const deleteHandler = async (id: string) => {
    await instance.delete(`/profiles/${id}`)
    setIsUpdated(!isUpdated)
  }

  const addProfileHandler = async () => {
    const profile = {
      name,
    }

    await instance.post('/profiles', profile)
    setName('')
    setIsUpdated(!isUpdated)
  }

  useEffect(() => {
    fetchProfiles()
  }, [isUpdated])

  return (
    <div className={styles.wrapper}>
      <b>Выберите профиль</b>
      <hr />
      {profiles.map((profile) => (
        <>
          <div
            className={styles.profile}
            onClick={() => setProfileId(profile._id)}
            key={profile._id}>
            {profile.name}
            <button className={styles.button} onClick={() => deleteHandler(profile._id)}>
              Удалить
            </button>
          </div>
        </>
      ))}
      <textarea
        className={styles.textarea}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className={styles.button} onClick={addProfileHandler}>
        Добавить профиль
      </button>
    </div>
  )
}
