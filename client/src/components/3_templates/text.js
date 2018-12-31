import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Buttons,
  Column,
  Columns,
  Icon,
  Spacer,
  UserContext
} from '../../components'
import { socket } from '../../services'
import { path } from '../../config'

const unFollowText = id => refetch => async () => {
  await socket.fetch('unFollowText', { id })
  socket.emit('user')
  refetch()
}

const followText = id => refetch => async () => {
  await socket.fetch('followText', { id })
  socket.emit('user')
  refetch()
}

export const Text = ({ data, refetch }) => {
  return (
    <UserContext.Consumer>
      {({ isConnected, user }) => (
        <>
          <div className="field has-text-centered">
            <h1 className="is-size-3">
              {data.rules ? data.group.name : data.name}
            </h1>
            <h2 className="is-size-5">
              {data.rules
                ? 'Règles du groupe ' + data.group.name
                : data.description}
            </h2>
            <p className="has-text-weight-semibold">
              {data.followersCount +
                ' participant' +
                (data.followersCount > 1 ? 's' : '')}
            </p>
          </div>
          <br />

          <Buttons>
            {data.group && (
              <Button to={path.group(data.group._id)}>
                <Icon type="fas fa-chevron-left" />
                <span>Retour au groupe</span>
              </Button>
            )}

            <Spacer />

            {isConnected() &&
              (user.followedTexts.find(text => text._id === data._id) ? (
                <Button
                  onClick={unFollowText(data._id)(refetch)}
                  className="button is-light"
                  disabled={data.rules}
                >
                  Ne plus participer à ce texte
                </Button>
              ) : (
                <Button
                  onClick={followText(data._id)(refetch)}
                  className="button is-success"
                  disabled={data.rules}
                >
                  Participer à ce texte
                </Button>
              ))}

            {isConnected() && (
              <Button
                to={path.edit(data._id)}
                className="is-info"
                disabled={
                  data.rules ||
                  !user.followedTexts.find(text => text._id === data._id)
                }
              >
                <Icon type="fas fa-plus" />
                <span>Proposer un amendement</span>
              </Button>
            )}
          </Buttons>

          <Columns>
            <Column>
              <Box>
                {data.actual
                  .split('\n')
                  .map((line, index) =>
                    line ? <p key={index}>{line}</p> : <br key={index} />
                  )}
              </Box>
            </Column>
            <Column>
              <Box>
                <p className="has-text-weight-semibold">
                  {data.patches.length +
                    ' amendement' +
                    (data.patches.length > 1 ? 's' : '') +
                    ' accepté' +
                    (data.patches.length > 1 ? 's' : '')}
                </p>
                <br />
                <p>Liste des amendements à voter</p>
                <ul>
                  {data.amends.map(amend => (
                    <li key={amend._id}>
                      <Link to={path.amend(amend._id)}>{amend.name}</Link>
                    </li>
                  ))}
                </ul>
              </Box>
            </Column>
          </Columns>
        </>
      )}
    </UserContext.Consumer>
  )
}