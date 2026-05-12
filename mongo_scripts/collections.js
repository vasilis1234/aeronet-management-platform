db = db.getSiblingDB('aeronetsystem');

// Δημιουργία και Εισαγωγή στο collection qc_reports (Αυτό που βλέπουμε στο Dashboard)
db.qc_reports.insertOne({
    "reportID": "QC-2026-001",
    "orderID": "ORD-9981",
    "partID": "PART_A320",
    "inspector": "Nikos Xarilaos",
    "status": "Passed",
    "timestamp": new Date(),
    "results": {
        "visual_inspection": "Confirmed",
        "dimensional_test": "Within tolerance",
        "notes": "Component meets all aerospace safety standards."
    }
});

db.createCollection('iot_logs');
db.createCollection('certifications');

// Παράδειγμα εγγραφής για certifications
db.certifications.insertOne({
    "certID": "CERT-552",
    "empID": "EMP_001",
    "type": "Safety Standards",
    "expiryDate": "2027-12-31"
});