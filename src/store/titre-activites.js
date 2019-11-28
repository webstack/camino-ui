import { activiteModifier } from '../api/activites'

export const state = {}

export const actions = {
  async update({ commit, dispatch, rootState }, activite) {
    commit('popupMessagesRemove', null, { root: true })
    commit('loadingAdd', 'titreActiviteUpdate', { root: true })
    try {
      const data = await activiteModifier({
        activite: {
          id: activite.id,
          contenu: activite.contenu,
          activiteStatutId: activite.statut.id
        }
      })

      commit('popupClose', null, { root: true })
      dispatch(
        'messageAdd',
        {
          value:
            data.statut.id === 'dep'
              ? `l'activite a été validée`
              : `l'activite a été enregistrée`,
          type: 'success'
        },
        { root: true }
      )
      dispatch(
        'titre/reload',
        { id: rootState.titre.current.id, idOld: rootState.titre.current.id },
        { root: true }
      )
    } catch (e) {
      commit('popupMessageAdd', { value: e, type: 'error' }, { root: true })
    } finally {
      commit('loadingRemove', 'titreActiviteUpdate', { root: true })
    }
  }
}

export const mutations = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
