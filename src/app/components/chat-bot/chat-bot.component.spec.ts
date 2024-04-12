import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbotComponent } from './chat-bot.component';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the chatbot iframe visibility', () => {
    expect(component.dialogflowIframeVisible).toBeFalsy();
    component.toggleChat();
    expect(component.dialogflowIframeVisible).toBeTruthy();
    component.toggleChat();
    expect(component.dialogflowIframeVisible).toBeFalsy();
  });
});
