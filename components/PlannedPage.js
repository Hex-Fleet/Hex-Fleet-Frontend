import AppShell from './AppShell';
import { PageHeader, SectionHeading } from './UI';

const pages = {
  live: { title: 'Live map', area: 'Institution dashboard', phase: 'Phase 2', endpoint: '/api/v1/vehicles + /api/v1/live/stream', features: ['Fleet map and vehicle selection', 'Status, route and tag filters', 'Follow vehicle and stale GPS states'] },
  vehicles: { title: 'Vehicles', area: 'Institution dashboard', phase: 'Phase 2', endpoint: '/api/v1/vehicles', features: ['Vehicle table and card views', 'Driver, route, speed and fuel', 'CSV export and filters'] },
  trips: { title: 'Trips', area: 'Institution dashboard', phase: 'Phase 2', endpoint: '/api/v1/trips', features: ['Cross-vehicle trip list', 'Date and vehicle filters', 'Trip replay entry point'] },
  fuel: { title: 'Fuel intelligence', area: 'Institution dashboard', phase: 'Phase 5', endpoint: '/api/v1/analytics/fuel + /api/v1/fuel/events', features: ['Fuel usage and mileage', 'Refill and possible-drain review', 'Calibration readiness'] },
  routes: { title: 'Routes', area: 'Institution dashboard', phase: 'Phase 6', endpoint: '/api/v1/routes', features: ['Route and stop management', 'Planned versus actual performance', 'Map builder entry point'] },
  geofences: { title: 'Geofences', area: 'Institution dashboard', phase: 'Phase 6', endpoint: '/api/v1/geofences', features: ['Circle and polygon areas', 'Vehicle assignment', 'Enter and exit alert rules'] },
  documents: { title: 'Documents & renewals', area: 'Institution dashboard', phase: 'Phase 7', endpoint: '/api/v1/renewals + /api/v1/vehicles/:id/documents', features: ['Overdue and due-soon board', 'Vehicle document records', 'Upload and reminder status'] },
  alerts: { title: 'Alerts', area: 'Institution dashboard', phase: 'Phase 6', endpoint: '/api/v1/alerts + /api/v1/alert-rules', features: ['Open, acknowledged and resolved inbox', 'Rule configuration', 'Acknowledgement and resolution actions'] },
  reports: { title: 'Reports', area: 'Institution dashboard', phase: 'Phase 7', endpoint: '/api/v1/reports + /api/v1/report-schedules', features: ['Report catalog and filters', 'CSV, PDF and Excel downloads', 'Schedules and run history'] },
  analytics: { title: 'Analytics', area: 'Institution dashboard', phase: 'Phase 8', endpoint: '/api/v1/analytics/*', features: ['Fleet, fuel and utilization tabs', 'Route and attendance trends', 'Comparison date ranges'] },
  'people/drivers': { title: 'People · Drivers', area: 'Institution dashboard', phase: 'Phase 4', endpoint: '/api/v1/drivers', features: ['Driver records', 'Licence expiry status', 'Vehicle assignment'] },
  'people/staff': { title: 'People · Staff', area: 'Institution dashboard', phase: 'Phase 4', endpoint: '/api/v1/staff + /api/v1/roles', features: ['Staff users and roles', 'Vehicle access', 'Invite and password reset'] },
  'people/cards': { title: 'People · RFID cards', area: 'Institution dashboard', phase: 'Phase 4', endpoint: '/api/v1/rfid-cards', features: ['Assigned and unassigned cards', 'Lost-card status', 'Last scan time'] },
  'admin/roles': { title: 'Administration · Roles', area: 'Institution dashboard', phase: 'Phase 4', endpoint: '/api/v1/roles', features: ['Permission matrix', 'Role builder', 'What this role sees preview'] },
  'admin/access': { title: 'Administration · Vehicle access', area: 'Institution dashboard', phase: 'Phase 4', endpoint: '/api/v1/staff/:id/vehicle-access', features: ['Per-user vehicle access', 'Bulk assignment', 'Permission-aware visibility'] },
  'admin/notifications': { title: 'Administration · Notifications', area: 'Institution dashboard', phase: 'Phase 6', endpoint: '/api/v1/notification-preferences', features: ['Alert type and channel matrix', 'User preferences', 'Tenant defaults'] },
  'admin/settings': { title: 'Administration · Settings', area: 'Institution dashboard', phase: 'Phase 0', endpoint: '/api/v1/settings', features: ['Organisation profile', 'Thresholds and retention', 'Timezone and map bounds'] },
  'admin/audit': { title: 'Administration · Audit', area: 'Institution dashboard', phase: 'Phase 0', endpoint: '/api/v1/audit', features: ['Tenant audit log', 'Actor and action filters', 'Target and timestamp details'] },
  'console/tenants': { title: 'Console · Tenants', area: 'Hextorq console', phase: 'Phase 3', endpoint: '/api/v1/console/tenants', features: ['Create and suspend tenants', 'Limits and feature switches', 'First tenant admin setup'] },
  'console/vehicles': { title: 'Console · Vehicles', area: 'Hextorq console', phase: 'Phase 3', endpoint: '/api/v1/console/vehicles', features: ['Provision vehicles', 'Allocate, revoke and transfer', 'Platform-only controls'] },
  'console/devices': { title: 'Console · Device registry', area: 'Hextorq console', phase: 'Phase 3', endpoint: '/api/v1/console/devices', features: ['Register hardware', 'Rotate and disable tokens', 'Stock versus allocated state'] },
  'console/assignments': { title: 'Console · Assignments', area: 'Hextorq console', phase: 'Phase 3', endpoint: '/api/v1/console/assignments', features: ['Link device to vehicle', 'Capability and primary-device rules', 'Conflict explanation'] },
  'console/health': { title: 'Console · Device health', area: 'Hextorq console', phase: 'Phase 3', endpoint: '/api/v1/console/device-health', features: ['Last seen and GPS fix', 'Supply, firmware and buffers', 'Offline and job heartbeat list'] },
  'console/integrations': { title: 'Console · Integrations', area: 'Hextorq console', phase: 'Phase 9', endpoint: 'Integration adapters', features: ['WheelsEye status', 'Camera integration placeholder', 'Provider health'] },
  'console/audit': { title: 'Console · Audit', area: 'Hextorq console', phase: 'Phase 3', endpoint: '/api/v1/console/audit', features: ['Platform audit log', 'Tenant and actor filters', 'Provisioning history'] }
};

export function getPlannedPage(slug) {
  const key = slug.join('/');
  if (pages[key]) return pages[key];
  if (slug[0] === 'vehicles' && slug.length === 2) return { ...pages.vehicles, title: 'Vehicle detail', endpoint: '/api/v1/vehicles/:id/*', features: ['Overview, history and fuel tabs', 'Attendance, documents and maintenance', 'Vehicle analytics'] };
  if (slug[0] === 'routes' && slug.length === 2) return { ...pages.routes, title: 'Route detail', endpoint: '/api/v1/routes/:id/*', features: ['Stops and planned times', 'Assigned bus and driver', 'Planned versus actual performance'] };
  return null;
}

export default function PlannedPage({ slug }) {
  const page = getPlannedPage(slug);
  return <AppShell><PageHeader eyebrow={`${page.area} · ${page.phase}`} title={page.title} description="This build-plan route is now registered in the frontend. Live data will appear when its backend contract is deployed." /><section className="plan-status panel"><div className="plan-status-mark">!</div><div><strong>Backend endpoint pending</strong><p>{page.endpoint}</p><span>The current production API exposes only the legacy dashboard endpoints. This page will remain honest and will not render fabricated fleet data.</span></div></section><section className="panel"><SectionHeading title="Planned capabilities" detail="From HEXFLEET-BUILD-PLAN.md" /><div className="plan-feature-grid">{page.features.map((feature) => <div className="plan-feature" key={feature}><span>○</span>{feature}</div>)}</div></section></AppShell>;
}
