<template>
  <div class="overflow-scroll-x">
    <table>
      <tr>
        <th>{{ nom }}</th>
        <th>Date</th>
        <th class="full-x-">
          Description
        </th>
        <th />
      </tr>
      <DocumentTr
        v-for="document in documents"
        :key="document.id"
        :document="document"
        :element-id="elementId"
        :context="context"
        :repertoire="repertoire"
        :title="title"
        :etiquette="etiquette"
        :bouton-suppression="boutonSuppression"
        :bouton-modification="boutonModification"
        :bouton-dissociation="boutonDissociation"
      />
    </table>
  </div>
</template>

<script>
import DocumentTr from './tr.vue'

export default {
  components: {
    DocumentTr
  },

  props: {
    documents: { type: Array, default: () => [] },
    elementId: { type: String, default: '' },
    nom: { type: String, default: 'Document' },
    title: { type: String, default: '' },
    context: { type: Object, required: true },
    repertoire: { type: String, required: true },
    boutonSuppression: { type: Boolean, default: false },
    boutonModification: { type: Boolean, default: false },
    boutonDissociation: { type: Boolean, default: false },
    etiquette: { type: Boolean, default: true }
  }
}
</script>
