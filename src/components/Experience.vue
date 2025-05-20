<template>
  <section id="experience" class="py-5">
    <div class="container">
      <h2 class="fw-bold mb-4 text-center">Esperienza</h2>
      <div class="row">
        <div v-for="item in experiences" :key="item.company" class="col-12 mb-4">
          <div class="p-4" style="background: rgba(255,255,255,0.05); border-radius: 0.5rem;">
            <h5 class="fw-semibold mb-2" style="color: var(--accent);">
              {{ item.title }} @ <strong>{{ item.company }}</strong>
            </h5>
            <p class="small mb-3">{{ item.from }} - {{ item.to }} | {{ item.location }}</p>
            <ul class="ps-4 mb-0">
              <li v-for="bullet in item.bullets" :key="bullet" class="mb-2">{{ bullet }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Experience',
  data() {
    return {
      experiences: [
        {
          title: 'Software Developer',
          company: 'Secarepay',
          from: 'Novembre 2024',
          to: 'Presente',
          location: 'Brescia, Italia',
          bullets: [
            'Sviluppo e manutenzione piattaforma rivendita auto in Phoenix (Elixir) + front-end in Angular.',
            'Microservizi in Python.'
          ]
        },
        {
          title: 'Lead Software Developer',
          company: 'Scaling Parrots',
          from: 'Aprile 2020',
          to: 'Ottobre 2024',
          location: 'Brescia, Italia',
          bullets: [
            'Sviluppo applicativi back-end in Node.js e Golang.',
            'Microservizi in Python.',
            'Utilizzo standard blockchain (ERC20, ERC721, ERC1155, ERC1271, ERC4337) e protocolli (Masterchef, VotingEscrow).',
            'Solidity per progetti emergenti: CurveCompound, Zapper: Stablecomp.'
          ]
        },
        {
          title: 'Software Developer',
          company: 'Nextre Engineering',
          from: 'Gennaio 2017',
          to: 'Marzo 2020',
          location: 'Milano, Italia',
          bullets: [
            'Manutenzione e sviluppo software agenzia viaggi Expedia con Java (Grails).',
            'Progetto Tech Companies Lab 2019 (Menzione speciale Cloud, Big Data, IoT).',
            'Manutenzione e migrazione software gestionale per HP.'
          ]
        },
        {
          title: 'Developer PLC',
          company: 'Margor SRL',
          from: 'Marzo 2014',
          to: 'Dicembre 2016',
          location: 'Calcinato (BS), Italia',
          bullets: [
            'Sviluppo software per automazione macchine aziendali con PLC.',
            'Prototipi IoT per smaltimento rifiuti.',
            'Prototipi per digitalizzazione processi di catalogazione pezzi meccanici.'
          ]
        }
      ]
    };
  }
};
</script>
