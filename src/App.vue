<script setup lang="ts">
import { AppNavigation, AppFooter } from '@/components/layout'
import { ImageBubbles } from '@/components/ui'
import {
  HeroSection,
  AboutSection,
  LineageSection,
  PedagogySection,
  TerritorySection,
  KintalSection,
  GallerySection,
  OrganizationsSection,
  LeadershipSection,
  MarchaSection,
  DocumentarySection,
  ExperienciasSection,
  OdsSection,
  CtaSection,
} from '@/components/sections'
</script>

<template>
  <div class="min-h-screen">
    <ImageBubbles />
    <AppNavigation />

    <main>
      <HeroSection />
      <AboutSection />
      <LineageSection />
      <TerritorySection />
      <PedagogySection />
      <KintalSection />
      <LeadershipSection />
      <MarchaSection />
      <DocumentarySection />
      <GallerySection />
      <OrganizationsSection />
      <ExperienciasSection />
      <OdsSection />
      <CtaSection />
    </main>

    <AppFooter />
  </div>
</template>
