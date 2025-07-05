## User Stories

### Epic 1: Authentication

- **US1.1:** Là một người dùng, tôi muốn đăng ký tài khoản để có thể truy cập và sử dụng hệ thống.
- **US1.2:** Là một người dùng, tôi muốn đăng nhập vào hệ thống để quản lý các task của mình.
- **US1.3:** Là một người dùng, tôi muốn đăng xuất để bảo vệ tài khoản của mình.

### Epic 2: Task Management (CRUD)

- **US2.1:** Là một người dùng đã đăng nhập, tôi muốn tạo task mới để quản lý các công việc của mình.
- **US2.2:** Là một người dùng đã đăng nhập, tôi muốn xem danh sách tất cả các task của mình để biết mình cần làm gì.
- **US2.3:** Là một người dùng đã đăng nhập, tôi muốn xem chi tiết một task để biết các thông tin liên quan.
- **US2.4:** Là một người dùng đã đăng nhập, tôi muốn cập nhật thông tin task (tên, mô tả, priority, due date, trạng thái) để đảm bảo task luôn chính xác.
- **US2.5:** Là một người dùng đã đăng nhập, tôi muốn xóa một task khi nó không còn cần thiết.

### Epic 3: Quản lý mức độ ưu tiên và ngày hết hạn

- **US3.1:** Là một người dùng, tôi muốn đặt mức độ ưu tiên (thấp, trung bình, cao) cho từng task để biết việc nào quan trọng hơn.
- **US3.2:** Là một người dùng, tôi muốn đặt ngày hết hạn cho task để không bỏ lỡ deadline.

### Epic 4: Đánh dấu hoàn thành

- **US4.1:** Là một người dùng, tôi muốn đánh dấu một task là đã hoàn thành để dễ dàng theo dõi tiến độ.

### Epic 5: Tìm kiếm và lọc

- **US5.1:** Là một người dùng, tôi muốn tìm kiếm task theo tên hoặc mô tả để nhanh chóng tìm task cần thiết.
- **US5.2:** Là một người dùng, tôi muốn lọc task theo trạng thái (hoàn thành/chưa hoàn thành), mức độ ưu tiên hoặc ngày hết hạn để dễ dàng quản lý công việc.

### Epic 6: Bảo mật và phân quyền

- **US6.1:** Là một người dùng, tôi chỉ muốn xem, sửa, xóa các task của mình, không phải của người khác.


## Functional Requirements

### 1. Authentication

- **FR1.1:** Cho phép đăng ký với email (unique, đúng định dạng) và password (tối thiểu 8 ký tự, gồm chữ, số, ký tự đặc biệt).
- **FR1.2:** Đăng nhập bằng email và password, trả về access token (JWT).
- **FR1.3:** Các API task yêu cầu access token hợp lệ.
- **FR1.4:** Người dùng chỉ thao tác với task của mình.

### 2. Task Management

- **FR2.1:** Tạo task mới với title (string, required, max 255 ký tự), description (optional), priority (enum: low, medium, high, default medium), dueDate (optional, date).
- **FR2.2:** Task mặc định completed=false khi tạo mới.
- **FR2.3:** Lấy danh sách task (có filter theo completed, priority, dueDate và search theo title/description).
- **FR2.4:** Lấy chi tiết task theo id.
- **FR2.5:** Cập nhật một hoặc nhiều trường của task (title, description, priority, dueDate, completed).
- **FR2.6:** Xóa task theo id.
- **FR2.7:** Đánh dấu hoàn thành (completed true/false).

### 3. Data Validation

- **FR3.1:** Email hợp lệ và không trùng lặp.
- **FR3.2:** Password đủ mạnh.
- **FR3.3:** title required, max 255 ký tự.
- **FR3.4:** priority chỉ nhận “low”, “medium”, “high”.
- **FR3.5:** dueDate phải là ngày hợp lệ.
- **FR3.6:** completed là boolean.
- **FR3.7:** Trả về lỗi 400 nếu dữ liệu không hợp lệ, lỗi 401/403 nếu không đúng quyền.

### 4. Security

- **FR4.1:** Password hash trước khi lưu.
- **FR4.2:** Chỉ trả về task thuộc user đang đăng nhập.
- **FR4.3:** Token hết hạn sau thời gian nhất định (ví dụ: 1 giờ).

### 5. Performance

- **FR5.1:** Hỗ trợ phân trang khi lấy danh sách task.
- **FR5.2:** API phản hồi trong vòng 1 giây với tải bình thường.


## Non-functional Requirements

### 1. Performance
- API phản hồi CRUD dưới 1 giây với tải bình thường (<1000 request/phút).
- Hỗ trợ phân trang để tránh trả về quá nhiều dữ liệu.
- Xử lý đồng thời tối thiểu 100 người dùng hoạt động.

### 2. Security
- Mật khẩu hash trước khi lưu.
- Sử dụng JWT bảo vệ các endpoint riêng tư.
- Token có thời hạn sử dụng; có thể có refresh token.
- Kiểm tra quyền truy cập mọi request; chỉ thao tác trên dữ liệu của chính mình.
- Chống SQL Injection, XSS, CSRF.
- Chỉ dùng HTTPS trên production.
- Logging các sự kiện bảo mật.

### 3. Scalability
- Hỗ trợ mở rộng chiều ngang cho backend.
- Database hỗ trợ nhiều kết nối đồng thời, mở rộng khi dữ liệu lớn.
- Dễ dàng tích hợp thêm dịch vụ ngoài (email, push notification).
- Kiến trúc dễ bảo trì, nâng cấp, bổ sung tính năng mới.

### 4. Usability
- Giao diện thân thiện, dễ thao tác, hỗ trợ responsive trên mọi thiết bị.
- Thông báo lỗi/trạng thái rõ ràng, hướng dẫn khắc phục khi cần.
- Thời gian học sử dụng hệ thống cho người mới không quá 10 phút.
- Các form nhập liệu có validation và gợi ý thông minh.

### 5. Reliability & Availability
- Uptime tối thiểu 99% mỗi tháng.
- Backup dữ liệu định kỳ (ít nhất 1 lần/ngày).
- Thông báo rõ ràng khi xảy ra lỗi nghiêm trọng, có hướng dẫn liên hệ hỗ trợ.
