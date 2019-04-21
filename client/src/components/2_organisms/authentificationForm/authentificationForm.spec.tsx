import * as React from 'react'
import { render, fireEvent } from 'react-testing-library'
import { I18nProvider } from '../..'
import { renderWithRouter } from '../../../helpers'
import { AuthentificationForm } from './authentificationForm'

it('should render a AuthentificationForm and login form', async () => {
  const { container, getByPlaceholderText } = renderWithRouter(
    <I18nProvider>
      <AuthentificationForm />
    </I18nProvider>
  )
  expect(container).toBeTruthy()

  expect(getByPlaceholderText('Email')).toBeTruthy()
  expect(getByPlaceholderText('Mot de passe')).toBeTruthy()
})

it('should render a AuthentificationForm pass to login/register and register/login', async () => {
  const { container, getByText, getByPlaceholderText } = renderWithRouter(
    <I18nProvider>
      <AuthentificationForm />
    </I18nProvider>
  )
  expect(container).toBeTruthy()

  fireEvent.click(getByText("Je n'ai pas de compte"))

  expect(await getByPlaceholderText('Email')).toBeTruthy()
  expect(await getByPlaceholderText('Nouveau mot de passe')).toBeTruthy()
  expect(
    await getByPlaceholderText('Verification du mot de passe')
  ).toBeTruthy()

  fireEvent.click(getByText("J'ai déjà un compte"))

  expect(await getByPlaceholderText('Email')).toBeTruthy()
  expect(await getByPlaceholderText('Mot de passe')).toBeTruthy()
})