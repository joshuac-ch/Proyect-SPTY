import React from 'react'
import UserList from '../../components/skeletons/UserList'
import { useChatStore } from '../../store/useChatStore'

export default function ListUsers() {
    const {isloadding,users,selectUser,setSelectUser,onlineUsers}=useChatStore()
  return (
    <>
    <UserList></UserList>
    min 7:40
    </>
  )
}
