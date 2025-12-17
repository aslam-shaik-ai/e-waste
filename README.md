♻️ E-Waste Collection Backend
===============================

A production-ready backend system built with Node.js, Express, and MongoDB to manage e-waste collection using role-based access, secure authentication and strict status lifecycle enforcement.

🚀 Project Overview
====================

This backend handles the complete workflow of e-waste collection:

                                                                requested → assigned → picked → completed

Each step is validated, secured, and controlled by user roles.

👥 User Roles
===============

👑 Admin
===========

Create collection requests → Assign technicians → View all collections → View activity logs → View dashboard statistics

🛠 Technician
==============

View only assigned collections → Mark collection as picked → Mark collection as completed → View logs for assigned collections only

🔐 Authentication & Authorization
===================================

→ JWT-based authentication

→ Role-based authorization using middleware

→ User identity derived from token (no client-side user spoofing)

→ Protected APIs for admin and technician actions

🔄 Collection Lifecycle (Strict)
==================================

|  Status   | Allowed By |      Rule         |
| --------- | ---------- | ----------------- |
| requested | Admin      | Initial state     |
| assigned  | Admin      | Only if requested |
| picked    | Technician | Only if assigned  |
| completed | Technician | Only if picked    |

Note: Invalid transitions are blocked.

🧾 Activity Logs (Audit Trail)
================================

→ Important actions (assign, pick, complete) are logged automatically

→ Logs store who did what and when

→ Admin can view logs for any collection

→ Technician can view logs only for assigned collections

Note: Logs are read-only

📊 Dashboard APIs
======================

→ Status-wise collection counts

→ Technician workload overview

→ Useful for admin dashboards and analytics

🗂 Project Structure
=====================

src/
├── controllers
├── models
├── routes
├── middleware
├── utils
└── index.js

🛠 Tech Stack
===============

Node.js → Express.js → MongoDB → Mongoose → JWT Authentication

🏁 Project Status
===================

✅ Backend complete and production-ready
🚀 Ready for frontend integration or deployment

🏆 Final Note
================

This project demonstrates:

                            Real-world backend design
                                      |
                          Secure role-based architecture
                                      |
                            State-controlled workflows
                                      |
                              Audit-ready logging