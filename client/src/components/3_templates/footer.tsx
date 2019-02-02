import React from 'react'
import { Link } from '../../components'
import { path } from '../../config'

const links: any[] = [
  { url: 'https://github.com/jimmyleray/Emendare', title: 'GitHub' },
  { url: path.code, title: 'Charte éthique' },
  { url: path.contributors, title: 'Contributeurs' },
  { url: path.legal, title: 'Mentions légales' }
]

export const Footer = () => (
  <footer>
    {links.map((link: any) => (
      <Link
        key={link.url}
        to={link.url}
        style={{
          display: 'block',
          textDecoration: 'none',
          marginBottom: '1rem',
          marginLeft: '1rem'
        }}
      >
        {link.title}
      </Link>
    ))}
  </footer>
)
