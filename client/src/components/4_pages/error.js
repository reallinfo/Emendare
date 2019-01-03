/*
 * Page d'erreur introuvable
 * Le but de cette page est de permettre aux utilisateurs :
 * - de comprendre que la page demandée est introuvable
 * - d'accéder rapidement à la page d'acceuil
 */

import React from 'react'
import { Button, Page } from '../../components'
import { path } from '../../config'

export const ErrorPage = ({
  error = { code: 404, message: "Oups, cette page n'existe pas ou plus" }
}) => (
  <Page title="Introuvable">
    <div className="field has-text-centered">
      <h1 className="is-size-3">Erreur {error.code}</h1>
      <h2 className="is-size-5">{error.message}</h2>
    </div>
    <div className="field is-grouped is-grouped-centered">
      <p className="control">
        <Button to={path.home} className="is-medium is-primary">
          Retour à l'accueil
        </Button>
      </p>
    </div>
  </Page>
)
