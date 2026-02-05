import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Navbar from '../Navbar.vue';

describe('Navbar', () => {
  it('should render correctly', () => {
    const wrapper = mount(Navbar);
    expect(wrapper.find('nav').exists()).toBe(true);
    expect(wrapper.text()).toContain('Daniele Primasso');
  });

  it('should have navigation links', () => {
    const wrapper = mount(Navbar);
    const links = wrapper.findAll('a.nav-link');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].attributes('href')).toBe('#about');
  });

  it('should have accessibility attributes', () => {
    const wrapper = mount(Navbar);
    const nav = wrapper.find('nav');
    expect(nav.attributes('role')).toBe('navigation');
    expect(nav.attributes('aria-label')).toBe('Navigazione principale');
  });
});
