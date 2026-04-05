class Patient {
  static totalPatients = 0;
  static allPatients = [];
  constructor(patientId, name, phone) {
    this.patientId = patientId;
    this.name = name;
    this.phone = phone;
    this.appointments = [];
    Patient.totalPatients++;
    Patient.allPatients.push(this);
  }
  register() {
    console.log("Patient " + this.name + " (ID: " + this.patientId + ") has been registered");
    return true;
  }
  updateContactInfo(newPhone) {
    var oldPhone = this.phone;
    this.phone = newPhone;
    console.log(this.name + "'s phone updated from " + oldPhone + " to " + newPhone);
    return true;
  }
  viewAppointments() {
    if (this.appointments.length === 0) {
      console.log(this.name + " has no scheduled appointments.");
      return [];
    }
    console.log("\nAppointments for " + this.name + ":");
    for (var i = 0; i < this.appointments.length; i++) {
      console.log("  " + (i+1) + ". " + this.appointments[i].getDetails());
    }
    return this.appointments;
  }
  static findPatientById(patientId) {
    for (var i = 0; i < Patient.allPatients.length; i++) {
      if (Patient.allPatients[i].patientId === patientId) {
        console.log("Found patient: " + Patient.allPatients[i].name);
        return Patient.allPatients[i];
      }
    }
    console.log("No patient found with ID: " + patientId);
    return null;
  }
  static getTotalPatients() {
    console.log("Total registered patients: " + Patient.totalPatients);
    return Patient.totalPatients;
  }
}
class Appointment {
  static totalAppointments = 0;
  static appointmentCounter = 1000;
  constructor(patient, dateTime, reason) {
    this.appointmentId = "APT-" + Appointment.appointmentCounter;
    Appointment.appointmentCounter++;
    this.patient = patient;
    this.dateTime = new Date(dateTime);
    this.reason = reason || "General Checkup";
    this.status = "scheduled";
    Appointment.totalAppointments++;
    patient.appointments.push(this);
  }
  schedule() {
    console.log("Appointment " + this.appointmentId + " scheduled for " + this.patient.name + " on " + this.dateTime.toLocaleString());
    console.log("   Reason: " + this.reason);
    return true;
  }
  cancel() {
    if (this.status === "cancelled") {
      console.log("Appointment " + this.appointmentId + " is already cancelled.");
      return false;
    }
    this.status = "cancelled";
    console.log("Appointment " + this.appointmentId + " for " + this.patient.name + " has been cancelled.");
    return true;
  }
  reschedule(newDateTime) {
    if (this.status === "cancelled") {
      console.log("Cannot reschedule a cancelled appointment.");
      return false;
    }
    var oldDateTime = this.dateTime;
    this.dateTime = new Date(newDateTime);
    console.log("Appointment " + this.appointmentId + " rescheduled from " + oldDateTime.toLocaleString() + " to " + this.dateTime.toLocaleString());
    return true;
  }
  getDetails() {
    return this.appointmentId + " | " + this.dateTime.toLocaleString() + " | " + this.reason + " | Status: " + this.status;
  }
  static getAppointmentStats() {
    var allAppointments = Appointment.getAllAppointments();
    var scheduled = 0, cancelled = 0, completed = 0;
    for (var i = 0; i < allAppointments.length; i++) {
      if (allAppointments[i].status === "scheduled") scheduled++;
      else if (allAppointments[i].status === "cancelled") cancelled++;
      else if (allAppointments[i].status === "completed") completed++;
    }
    console.log("\nAppointment Statistics:");
    console.log("   Total: " + Appointment.totalAppointments);
    console.log("   Scheduled: " + scheduled);
    console.log("   Completed: " + completed);
    console.log("   Cancelled: " + cancelled);
    return { total: Appointment.totalAppointments, scheduled, completed, cancelled };
  }
  static getAllAppointments() {
    var allAppointments = [];
    for (var i = 0; i < Patient.allPatients.length; i++) {
      for (var j = 0; j < Patient.allPatients[i].appointments.length; j++) {
        allAppointments.push(Patient.allPatients[i].appointments[j]);
      }
    }
    return allAppointments;
  }
}
console.log("=".repeat(60));
console.log("PATIENT APPOINTMENT SYSTEM - DEMONSTRATION");
console.log("=".repeat(60));
console.log("\n1. REGISTERING PATIENTS:");
var p1 = new Patient("P001", "Alice Johnson", "555-0101");
p1.register();
var p2 = new Patient("P002", "Bob Smith", "555-0102");
p2.register();
console.log("\n2. SCHEDULING APPOINTMENTS:");
var a1 = new Appointment(p1, "2025-06-15T10:00:00", "Annual Physical");
a1.schedule();
var a2 = new Appointment(p1, "2025-06-20T14:30:00", "Follow-up");
a2.schedule();
var a3 = new Appointment(p2, "2025-06-16T11:15:00", "Vaccination");
a3.schedule();
console.log("\n3. CANCELLING APPOINTMENT:");
a2.cancel();
Appointment.getAppointmentStats();
console.log("\n" + "=".repeat(60));
console.log("DEMONSTRATION COMPLETE");
console.log("=".repeat(60));
