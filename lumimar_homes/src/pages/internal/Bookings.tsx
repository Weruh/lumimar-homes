import { useEffect, useMemo, useState } from 'react';
import { sendClientMessage } from '../../lib/bookingRequests';
import { lumimar } from '../../lib/supabase';
import type { Database } from '../../lib/database.types';

type BookingRequest = Database['lumimar']['Tables']['booking_requests']['Row'];

const STATUSES = ['new', 'reviewing', 'responded', 'confirmed', 'cancelled'] as const;

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  reviewing: 'Reviewing',
  responded: 'Responded',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
};

const STATUS_CLASSES: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  reviewing: 'bg-amber-50 text-amber-700',
  responded: 'bg-cyan-50 text-cyan-700',
  confirmed: 'bg-emerald-50 text-emerald-700',
  cancelled: 'bg-rose-50 text-rose-700',
};

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatDate(value: string | null) {
  if (!value) {
    return 'Not set';
  }

  return new Intl.DateTimeFormat('en-KE', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function InternalBookings() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const loadBookings = async () => {
    if (!lumimar) {
      setError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: bookingsError } = await lumimar
      .from('booking_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (bookingsError) {
      setError(bookingsError.message);
      setBookings([]);
    } else {
      setBookings(data ?? []);
      setSelectedBookingId((current) => current ?? data?.[0]?.id ?? null);
    }

    setLoading(false);
  };

  useEffect(() => {
    void loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesSearch =
        !query ||
        [booking.guest_name, booking.guest_email, booking.guest_phone, booking.suite_name, booking.room_type]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  const selectedBooking = useMemo(
    () => filteredBookings.find((booking) => booking.id === selectedBookingId) ?? filteredBookings[0] ?? null,
    [filteredBookings, selectedBookingId],
  );

  useEffect(() => {
    if (!selectedBooking) {
      setReplySubject('');
      setReplyMessage('');
      setAdminNotes('');
      return;
    }

    setReplySubject(`Your Lumimar booking request for ${selectedBooking.suite_name}`);
    setReplyMessage(
      `Thanks for your interest in ${selectedBooking.suite_name}.\n\nWe are checking availability for ${formatDate(selectedBooking.check_in)} to ${formatDate(selectedBooking.check_out)} for ${selectedBooking.guests} guest${selectedBooking.guests === 1 ? '' : 's'}.\n\n`,
    );
    setAdminNotes(selectedBooking.admin_notes ?? '');
  }, [selectedBooking]);

  const totals = useMemo(
    () =>
      STATUSES.reduce(
        (acc, status) => {
          acc[status] = bookings.filter((booking) => booking.status === status).length;
          return acc;
        },
        {} as Record<string, number>,
      ),
    [bookings],
  );

  const updateBooking = async (updates: Partial<BookingRequest>) => {
    if (!lumimar || !selectedBooking) {
      return;
    }

    setSaving(true);
    setError(null);
    setNotice(null);

    const { error: updateError } = await lumimar.from('booking_requests').update(updates).eq('id', selectedBooking.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setBookings((current) =>
        current.map((booking) => (booking.id === selectedBooking.id ? { ...booking, ...updates } : booking)),
      );
      setNotice('Booking request updated.');
    }

    setSaving(false);
  };

  const sendReply = async () => {
    if (!selectedBooking) {
      return;
    }

    setSending(true);
    setError(null);
    setNotice(null);

    try {
      await sendClientMessage({
        bookingRequestId: selectedBooking.id,
        recipientEmail: selectedBooking.guest_email,
        recipientName: selectedBooking.guest_name,
        subject: replySubject,
        message: replyMessage,
      });
      setBookings((current) =>
        current.map((booking) =>
          booking.id === selectedBooking.id
            ? { ...booking, status: 'responded', last_response_at: new Date().toISOString() }
            : booking,
        ),
      );
      setNotice(`Reply sent to ${selectedBooking.guest_email}.`);
    } catch (messageError) {
      setError(messageError instanceof Error ? messageError.message : 'Failed to send reply.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Client Requests</p>
          <h2 className="mt-1 text-3xl font-headline font-bold text-primary">Room Booking Requests</h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Review guest booking requests, update their status, and reply by email from the admin dashboard.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadBookings()}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-base">refresh</span>
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
            className={`rounded-xl p-5 text-left shadow-ambient transition-colors ${
              statusFilter === status ? 'bg-primary text-white' : 'bg-surface-container-lowest text-primary hover:bg-surface-container-low'
            }`}
          >
            <p className={`text-xs font-bold uppercase tracking-widest ${statusFilter === status ? 'text-white/70' : 'text-on-surface-variant'}`}>
              {STATUS_LABELS[status]}
            </p>
            <h3 className="mt-2 text-3xl font-bold">{totals[status] ?? 0}</h3>
          </button>
        ))}
      </div>

      {error ? <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      {notice ? <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p> : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.8fr)]">
        <section className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient">
          <div className="flex flex-col gap-3 border-b border-outline-variant/20 bg-surface-container/30 p-5 lg:flex-row lg:items-center lg:justify-between">
            <h3 className="font-bold text-primary">Requests</h3>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search guest, room, email..."
                className="rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm text-primary focus:outline-none focus:border-primary"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-outline-variant/30 bg-white px-4 py-2 text-sm text-primary focus:outline-none focus:border-primary"
              >
                <option value="all">All statuses</option>
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant/10 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                  <th className="p-5">Guest</th>
                  <th className="p-5">Room</th>
                  <th className="p-5">Dates</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Submitted</th>
                  <th className="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-on-surface-variant">
                      Loading booking requests...
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-sm text-on-surface-variant">
                      No booking requests match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-container text-sm font-bold text-primary">
                            {getInitials(booking.guest_name)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary">{booking.guest_name}</p>
                            <p className="text-xs text-on-surface-variant">{booking.guest_email}</p>
                            <p className="text-xs text-on-surface-variant">{booking.guest_phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <p className="text-sm font-bold text-primary">{booking.suite_name}</p>
                        <p className="text-xs text-on-surface-variant">{booking.room_type} / {booking.guests} guests</p>
                      </td>
                      <td className="p-5 text-sm text-primary">
                        {formatDate(booking.check_in)} - {formatDate(booking.check_out)}
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${STATUS_CLASSES[booking.status] ?? 'bg-surface-container text-primary'}`}>
                          {STATUS_LABELS[booking.status] ?? booking.status}
                        </span>
                      </td>
                      <td className="p-5 text-sm text-on-surface-variant">{formatDateTime(booking.created_at)}</td>
                      <td className="p-5 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedBookingId(booking.id)}
                          className="text-xs font-bold text-primary hover:underline"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
          {selectedBooking ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Selected Request</p>
                <h3 className="mt-2 text-2xl font-headline font-bold text-primary">{selectedBooking.suite_name}</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {selectedBooking.guest_name} / {selectedBooking.guests} guest{selectedBooking.guests === 1 ? '' : 's'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm">
                <a href={`mailto:${selectedBooking.guest_email}`} className="rounded-lg bg-surface-container-low px-4 py-3 text-primary hover:underline">
                  {selectedBooking.guest_email}
                </a>
                <a href={`tel:${selectedBooking.guest_phone}`} className="rounded-lg bg-surface-container-low px-4 py-3 text-primary hover:underline">
                  {selectedBooking.guest_phone}
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-surface-container-low p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Check In</p>
                  <p className="mt-1 text-primary">{formatDate(selectedBooking.check_in)}</p>
                </div>
                <div className="rounded-lg bg-surface-container-low p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Check Out</p>
                  <p className="mt-1 text-primary">{formatDate(selectedBooking.check_out)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Client Message</p>
                <p className="mt-2 rounded-lg bg-surface-container-low p-4 text-sm leading-relaxed text-primary">
                  {selectedBooking.message || 'No message provided.'}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Status</label>
                <select
                  value={selectedBooking.status}
                  disabled={saving || sending}
                  onChange={(event) => void updateBooking({ status: event.target.value })}
                  className="w-full rounded-lg border border-outline-variant/30 bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:border-primary disabled:opacity-60"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Admin Notes</label>
                <textarea
                  value={adminNotes}
                  onChange={(event) => setAdminNotes(event.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-outline-variant/30 bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:border-primary"
                  placeholder="Internal notes..."
                />
                <button
                  type="button"
                  onClick={() => void updateBooking({ admin_notes: adminNotes })}
                  disabled={saving || sending}
                  className="mt-2 rounded-lg border border-outline-variant/30 px-4 py-2 text-sm font-bold text-primary hover:bg-surface-container disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Notes'}
                </button>
              </div>

              <div className="space-y-3 border-t border-outline-variant/20 pt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Reply By Email</p>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(event) => setReplySubject(event.target.value)}
                  className="w-full rounded-lg border border-outline-variant/30 bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:border-primary"
                  placeholder="Subject"
                />
                <textarea
                  value={replyMessage}
                  onChange={(event) => setReplyMessage(event.target.value)}
                  rows={7}
                  className="w-full rounded-lg border border-outline-variant/30 bg-white px-4 py-3 text-sm text-primary focus:outline-none focus:border-primary"
                  placeholder="Write the message to the client..."
                />
                <button
                  type="button"
                  onClick={() => void sendReply()}
                  disabled={sending || !replySubject.trim() || !replyMessage.trim()}
                  className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-ambient hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? 'Sending Reply...' : `Send Reply to ${selectedBooking.guest_name}`}
                </button>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">mail</span>
              <p className="mt-3 text-sm text-on-surface-variant">Select a booking request to review.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
