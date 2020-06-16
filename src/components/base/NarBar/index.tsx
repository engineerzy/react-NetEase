import React, { useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom'
import styles from './style.module.scss';

type INav = {
  name: string;
  route: string;
}

type NavProps = INav & {
  active: boolean;
  handle: () => void;
}

const NAVS: Array<INav> = [
  {
    name: '推荐音乐',
    route: '/home/recommend'
  },
  {
    name: '热歌榜',
    route: '/home/hot'
  },
  {
    name: '搜索',
    route: '/home/search'
  }
]

const useNavRoute = () => {
	const {pathname} = useLocation()
	const index = NAVS.findIndex(nav => nav.route === pathname)
  const currentIndex = useRef<number>(index)
  const handleClick = useCallback(
    (index) => {
      if(index === currentIndex.current) return;
      currentIndex.current = index
    },
    [],
  )
  return { currentIndex: currentIndex.current, handleClick }
}

const Nav = ({name, route, active, handle}: NavProps) => {
  return (
    <Link 
      to={route} 
      onClick={handle}
      className={`${styles['header-nav-item']} ${active ? styles['active'] : ''}`}>
      <em>{ name }</em>
    </Link>
  )
}

export default function NarBar () {
  const { currentIndex, handleClick } = useNavRoute()
  return (
    <div className={styles['app-header-nav']}>
       {
         NAVS.map((nav, index) => <Nav
          {...nav}
          active={currentIndex === index}
          handle={() => handleClick(index)}
          key={nav.name} />)
       }
    </div>
  )
}
