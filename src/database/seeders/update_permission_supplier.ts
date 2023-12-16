import { dbConfig } from "../config";
import { Role } from "../models";
dbConfig;
async function updatePermissionForRole(roleId) {
  const permisstionId = [
    '6520efabf5fce79b18515cf4',
    '6520efabf5fce79b18515cf5',
    '6520efabf5fce79b18515cf6',
    '6520efabf5fce79b18515cf7',
    '654de84718b77902714302c4',
    '6520efabf5fce79b18515ce4',
    '6520efabf5fce79b18515ce5',
    '6520efabf5fce79b18515ce6',
    '6520efabf5fce79b18515ce7'
  ];

  // Use findOne to get the document
  const role:any = await Role.findOne({ _id: roleId });

  if (!role) {
    console.log("Role not found");
    return;
  }

  role.IDPermission = permisstionId;

  // Save the document
  await role.save();
  console.log("Permissions updated for role:", role);
}

async function main() {
  await dbConfig.connect();
  const args = process.argv.slice(2); // get idUser from command line
  console.log(args[0]);

  if (!args.length) {
    console.log("Please input roleId");
    return;
  }

  await updatePermissionForRole(args[0]);
  return;
}

main();
