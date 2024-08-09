const role = JSON.parse(localStorage.getItem('role'));

export function isNotario() {
  return role.some(r => r.id === 7);      // Si tiene 7 rol de notario
}

export function listRoles() {
  return role;
}