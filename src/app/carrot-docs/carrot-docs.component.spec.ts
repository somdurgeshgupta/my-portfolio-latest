import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ProjectsComponent } from '../profile/projects/projects.component';
import { CarrotDocsComponent } from './carrot-docs.component';

describe('Carrot AI project documentation navigation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      imports: [CommonModule, RouterModule, CarrotDocsComponent],
      providers: [provideRouter([
        { path: '', component: ProjectsComponent },
        { path: 'projects/carrot-ai', loadComponent: () => Promise.resolve(CarrotDocsComponent) }
      ])]
    });
  });

  it('opens documentation from the project card and returns to projects', async () => {
    const harness = await RouterTestingHarness.create('/');
    const projectLink = harness.routeNativeElement!.querySelector<HTMLAnchorElement>('.docs-link')!;
    expect(projectLink.getAttribute('target')).toBeNull();
    projectLink.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/projects/carrot-ai');
    expect(harness.routeNativeElement!.querySelector('h1')!.textContent).toContain('Carrot AI');
    harness.routeNativeElement!.querySelector<HTMLAnchorElement>('.back-link')!.click();
    await harness.fixture.whenStable();
    harness.detectChanges();
    expect(TestBed.inject(Router).url).toBe('/#projects');
    expect(harness.routeNativeElement!.querySelector('.docs-link')).not.toBeNull();
  });

  it('supports direct entry and resolves every contents link to a documentation section', async () => {
    const harness = await RouterTestingHarness.create('/projects/carrot-ai');
    const page = harness.routeNativeElement!;
    const links = Array.from(page.querySelectorAll<HTMLAnchorElement>('.contents nav a'));
    expect(links.length).toBe(10);
    for (const link of links) {
      const id = link.hash.slice(1);
      expect(page.querySelector(`#${id}`)).withContext(id).not.toBeNull();
    }
    links.find(link => link.hash === '#authentication')!.click();
    await harness.fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/projects/carrot-ai#authentication');
    expect(page.querySelector('#authentication')!.textContent).toContain('VS Code Secret Storage');
  });
});
