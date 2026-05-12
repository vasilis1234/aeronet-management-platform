/* AeroNet Management Platform - MongoDB Collections & Sample Data */


db = db.getSiblingDB('aeronetsystem');


db.qc_reports.insertMany([
    {
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
    },
    {
        "reportID": "QC-2026-002",
        "orderID": "ORD-1025",
        "partID": "ENG-X99",
        "inspector": "Maria K.",
        "status": "Pending",
        "timestamp": new Date(),
        "results": {
            "visual_inspection": "Minor scratches observed",
            "dimensional_test": "In Progress"
        }
    }
]);


db.createCollection('iot_logs');
db.iot_logs.insertMany([
    {
        "sensor_id": "SNS-TEMP-01",
        "value": 22.4,
        "unit": "Celsius",
        "timestamp": new Date()
    },
    {
        "sensor_id": "SNS-PRESS-04",
        "value": 1013.2,
        "unit": "hPa",
        "timestamp": new Date()
    }
]);


db.createCollection('certifications');
db.certifications.insertOne({
    "certID": "CERT-552",
    "empID": "EMP_001",
    "type": "Safety Standards",
    "expiryDate": "2027-12-31",
    "issuedBy": "EASA"
});