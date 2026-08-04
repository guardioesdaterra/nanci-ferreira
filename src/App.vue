<script setup lang="ts">
import { AppNavigation, AppFooter } from '@/components/layout'
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
  TourismSection,
  EventsSection,
  OdsSection,
  CtaSection,
} from '@/components/sections'
</script>

<template>
  <div class="min-h-screen">
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
      <TourismSection />
      <EventsSection />
      <OdsSection />
      <CtaSection />
    </main>

    <AppFooter />
  </div>
</template>
