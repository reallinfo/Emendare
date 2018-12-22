/*
 * Page d'amendement
 * Le but de cette page est de permettre aux utilisateurs :
 * - de visualiser la version actuelle du texte
 * - TODO : d'éditer le texte et de visualiser les modification
 * - TODO : d'écrire un argumentaire pour défendre l'amendement
 * - TODO : de valider l'ajout de l'amendement à la liste du texte
 * - TODO : de mettre à jour l'amendement sur la dernière version du texte
 * - TODO : d'accéder au détail d'un amendement
 * - TODO : de visualiser le vote de l'amendement
 * - TODO : de participer au vote sur l'amendement
 */

import React from 'react'
import { Amend, Page } from '../components'
import { apiFetch } from '../utils'

export class AmendPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: null
    }
  }

  fetchData() {
    apiFetch('/text/' + this.props.match.params.id).then(async res => {
      if (res.status === 200) {
        const text = await res.json()
        this.setState({ text })
      }
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData()
    }
  }

  render() {
    return (
      <Page
        title={
          this.state.text
            ? 'Amendement de ' + this.state.text.group.name
            : 'Amendement'
        }
      >
        {this.state.text && <Amend data={this.state.text} />}
      </Page>
    )
  }
}
